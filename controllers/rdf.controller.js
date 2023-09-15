const fs = require("fs");
const rdf = require("rdflib");
const path = require("path");
// const rdfContent = fs.readFileSync(rdfFilePath, "utf-8");
const { StatusCodes } = require("http-status-codes");
const rdfFilePath = path.resolve(__dirname, "books.rdf");
const rdfController = {
  getAllData: async (req, res) => {
    try {
      const rdfContent = fs.readFileSync(rdfFilePath, "utf-8");
      // Tạo đối tượng graph RDF
      const store = rdf.graph();

      // Parse RDF từ nội dung file
      rdf.parse(
        rdfContent,
        store,
        "http://example.com/",
        "application/rdf+xml"
      );

      // Namespace
      const ns = {
        dc: rdf.Namespace("http://purl.org/dc/terms/"),
        schema: rdf.Namespace("http://schema.org/"),
      };

      // Lấy danh sách tất cả các cuốn sách trong RDF
      const books = store.match(
        null,
        rdf.sym("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"),
        ns.schema("Book")
      );

      const bookslist = [];
      // In thông tin từng cuốn sách
      books.forEach((book) => {
        const booksInfo = {
          title: store.anyValue(book.subject, ns.dc("title")),
          creator: store.anyValue(book.subject, ns.dc("creator")),
          id: store.anyValue(book.subject, ns.dc("id")),
          imgLink: store.anyValue(book.subject, ns.dc("img")),
          accountPostedId: store.anyValue(book.subject, ns.dc("postedBy")),
        };
        bookslist.push(booksInfo);
      });
      res.status(StatusCodes.OK).json(bookslist);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("Something wrong!");
    }
  },
  searchOne: async (req, res) => {
    const rdfContent = fs.readFileSync(rdfFilePath, "utf-8");
    const store = rdf.graph();

    // Parse RDF từ nội dung file
    rdf.parse(rdfContent, store, "http://example.com/", "application/rdf+xml");

    // Namespace
    const ns = {
      dc: rdf.Namespace("http://purl.org/dc/terms/"),
      schema: rdf.Namespace("http://schema.org/"),
    };

    const { searchTitle } = req.body;
    const titleSearch = searchTitle.toLowerCase();

    // Lấy danh sách tất cả các cuốn sách trong RDF
    const books = store.match(
      null,
      rdf.sym("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"),
      ns.schema("Book")
    );

    try {
      // Tìm kiếm và in thông tin các cuốn sách có tiêu đề phù hợp
      books.forEach((book) => {
        const title = store.anyValue(book.subject, ns.dc("title"));

        if (title.toLowerCase().includes(titleSearch)) {
          const booksInfo = {
            title: store.anyValue(book.subject, ns.dc("title")),
            creator: store.anyValue(book.subject, ns.dc("creator")),
            id: store.anyValue(book.subject, ns.dc("id")),
            imgLink: store.anyValue(book.subject, ns.dc("img")),
            accountPostedId: store.anyValue(book.subject, ns.dc("postedBy")),
          };
          return res.status(StatusCodes.OK).json(booksInfo);
        }
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("sthWrong!");
    }
  },
};
module.exports = rdfController;
