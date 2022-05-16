const request = require("supertest");
const { expect } = require("chai");
const app = require("../App");

describe("Test Block API insertions", () => {
   it("POST /api/insert --> inserted to root page", () => {
      const data = [
         {
            path: "root",
            content: "Hello! I'm first block of the page",
         },
         {
            path: "root",
            content: "Hello! I'm second block of the page",
         },
      ];

      const afterTestData = [
         {
            content: "Hello! I'm first block of the page",
            subBlocks: [],
         },
         {
            content: "Hello! I'm second block of the page",
            subBlocks: [],
         },
      ];

      request(app)
         .post("/api/insert")
         .send(data)
         .end((err, res) => {
            expect(JSON.stringify(res.body)).to.be.equal(JSON.stringify(data));
            expect(res.statusCode).to.be.equal(200);
         });

      request(app)
         .get("/api/export")
         .end((err, res) => {
            expect(JSON.stringify(res.body)).to.be.equal(
               JSON.stringify(afterTestData)
            );
         });
   });

   it("POST /api/insert --> inserted as a sub block to a block", () => {
      const data = [
         {
            path: "root-0",
            content: "Hello! I'm a sub block",
         },
         {
            path: "root-0-0",
            content: "Hello! I'm a sub-sub block",
         },
      ];

      const afterTestData = [
         {
            content: "Hello! I'm first block of the page",
            subBlocks: [
               {
                  content: "Hello! I'm a sub block",
                  subBlocks: [
                     {
                        content: "Hello! I'm a sub-sub block",
                        subBlocks: [],
                     },
                  ],
               },
            ],
         },
         {
            content: "Hello! I'm second block of the page",
            subBlocks: [],
         },
      ];

      request(app)
         .post("/api/insert")
         .send(data)
         .end((err, res) => {
            expect(JSON.stringify(res.body)).to.be.equal(JSON.stringify(data));
            expect(res.statusCode).to.be.equal(200);
         });

      request(app)
         .get("/api/export")
         .end((err, res) => {
            expect(JSON.stringify(res.body)).to.be.equal(
               JSON.stringify(afterTestData)
            );
         });
   });

   it("POST /api/insert --> some insertions failed due to invalid paths (nothing inserted for those insertions)", () => {
      const data = [
         {
            path: "root-0-0-0-0-0",
            content: "Hello! I'm a sub block",
         },
      ];

      request(app)
         .post("/api/insert")
         .send(data)
         .end((err, res) => {
            expect(JSON.stringify(res.body)).to.be.equal(JSON.stringify([]));
            expect(res.statusCode).to.be.equal(200);
         });
   });

   it("POST /api/insert --> some insertions failed due to missing paths or contents (nothing inserted for those insertions)", () => {
      const data = [
         {
            content: "Hello! I'm a sub block",
         },
      ];

      request(app)
         .post("/api/insert")
         .send(data)
         .end((err, res) => {
            expect(JSON.stringify(res.body)).to.be.equal(JSON.stringify([]));
            expect(res.statusCode).to.be.equal(200);
         });
   });
});

describe("Test Block API deletions", () => {
   it("DELETE /api/delete --> blocks deleted", () => {
      const data = [
         {
            path: "root-1",
         },
      ];

      const afterTestData = [
         {
            content: "Hello! I'm first block of the page",
            subBlocks: [
               {
                  content: "Hello! I'm a sub block",
                  subBlocks: [
                     {
                        content: "Hello! I'm a sub-sub block",
                        subBlocks: [],
                     },
                  ],
               },
            ],
         },
      ];

      request(app)
         .delete("/api/delete")
         .send(data)
         .end((err, res) => {
            expect(JSON.stringify(res.body)).to.be.equal(JSON.stringify(data));
            expect(res.statusCode).to.be.equal(200);
         });

      request(app)
         .get("/api/export")
         .end((err, res) => {
            expect(JSON.stringify(res.body)).to.be.equal(
               JSON.stringify(afterTestData)
            );
         });
   });

   // After the test
   // [{
   //   content: "Hello! I'm first block of the page",
   //   subBlocks: [
   //      {
   //         content: "Hello! I'm a sub block",
   //         subBlocks: []
   //      }
   //   ]
   // }]
   it("DELETE /api/delete --> sub blocks deleted", () => {
      const data = [
         {
            path: "root-0-0-0",
         },
      ];

      const afterTestData = [
         {
            content: "Hello! I'm first block of the page",
            subBlocks: [
               {
                  content: "Hello! I'm a sub block",
                  subBlocks: [],
               },
            ],
         },
      ];

      request(app)
         .delete("/api/delete")
         .send(data)
         .end((err, res) => {
            expect(JSON.stringify(res.body)).to.be.equal(JSON.stringify(data));
            expect(res.statusCode).to.be.equal(200);
         });

      request(app)
         .get("/api/export")
         .end((err, res) => {
            expect(JSON.stringify(res.body)).to.be.equal(
               JSON.stringify(afterTestData)
            );
         });
   });

   it("DELETE /api/delete --> some deletions failed due to invalid paths (nothing deleted for those deletions)", () => {
      const data = [
         {
            path: "root-1-0-3-24143",
         },
      ];

      request(app)
         .delete("/api/delete")
         .send(data)
         .end((err, res) => {
            expect(JSON.stringify(res.body)).to.be.equal(JSON.stringify([]));
            expect(res.statusCode).to.be.equal(200);
         });
   });

   it("DELETE /api/delete --> some deletions failed due to missing paths (nothing deleted for those deletions)", () => {
      const data = [
         {
            abc: "abc",
         },
      ];

      request(app)
         .delete("/api/delete")
         .send(data)
         .end((err, res) => {
            expect(JSON.stringify(res.body)).to.be.equal(JSON.stringify([]));
            expect(res.statusCode).to.be.equal(200);
         });
   });
});

describe("Test Block API insertions", () => {
   it("POST /api/duplicate/:path --> block duplicated", () => {
      const afterTestData = [
         {
            content: "Hello! I'm first block of the page",
            subBlocks: [
               {
                  content: "Hello! I'm a sub block",
                  subBlocks: [],
               },
            ],
         },
         {
            content: "Hello! I'm first block of the page",
            subBlocks: [
               {
                  content: "Hello! I'm a sub block",
                  subBlocks: [],
               },
            ],
         },
      ];

      request(app)
         .post("/api/duplicate/root-0")
         .end((err, res) => {
            expect(res.text).to.be.equal("Duplicated the block successfully");
            expect(res.statusCode).to.be.equal(200);
         });

      request(app)
         .get("/api/export")
         .end((err, res) => {
            expect(JSON.stringify(res.body)).to.be.equal(
               JSON.stringify(afterTestData)
            );
         });
   });

   it("POST /api/duplicate/:path --> sub block duplicated", () => {
      const afterTestData = [
         {
            content: "Hello! I'm first block of the page",
            subBlocks: [
               {
                  content: "Hello! I'm a sub block",
                  subBlocks: [],
               },
               {
                  content: "Hello! I'm a sub block",
                  subBlocks: [],
               },
            ],
         },
         {
            content: "Hello! I'm first block of the page",
            subBlocks: [
               {
                  content: "Hello! I'm a sub block",
                  subBlocks: [],
               },
            ],
         },
      ];

      request(app)
         .post("/api/duplicate/root-0-0")
         .end((err, res) => {
            expect(res.text).to.be.equal("Duplicated the block successfully");
            expect(res.statusCode).to.be.equal(200);
         });

      request(app)
         .get("/api/export")
         .end((err, res) => {
            expect(JSON.stringify(res.body)).to.be.equal(
               JSON.stringify(afterTestData)
            );
         });
   });

   it("POST /api/duplicate/:path --> invalid path (path does not exist)", () => {
      request(app)
         .post("/api/duplicate/root-0-432923478")
         .end((err, res) => {
            expect(res.text).to.be.equal("Target block does not exist");
            expect(res.statusCode).to.be.equal(404);
         });
   });

   it("POST /api/duplicate/:path --> invalid path (duplicating a page)", () => {
      request(app)
         .post("/api/duplicate/root")
         .end((err, res) => {
            expect(res.text).to.be.equal("Cannot duplicate the page");
            expect(res.statusCode).to.be.equal(400);
         });
   });
});

describe("Test Block API movations", () => {
   it("PATCH /api/move --> block moved to root page", () => {
      const data = {
         sourcePath: "root-1",
         targetPath: "root",
         position: 0,
      };

      const afterTestData = [
         {
            content: "Hello! I'm first block of the page",
            subBlocks: [
               {
                  content: "Hello! I'm a sub block",
                  subBlocks: [],
               },
            ],
         },
         {
            content: "Hello! I'm first block of the page",
            subBlocks: [
               {
                  content: "Hello! I'm a sub block",
                  subBlocks: [],
               },
               {
                  content: "Hello! I'm a sub block",
                  subBlocks: [],
               },
            ],
         },
      ];

      request(app)
         .put("/api/move")
         .send(data)
         .end((err, res) => {
            expect(res.text).to.be.equal("Moved successfully");
            expect(res.statusCode).to.be.equal(200);
         });

      request(app)
         .get("/api/export")
         .end((err, res) => {
            expect(JSON.stringify(res.body)).to.be.equal(
               JSON.stringify(afterTestData)
            );
         });
   });

   it("PATCH /api/move --> block moved to a block", () => {
      const data = {
         sourcePath: "root-0",
         targetPath: "root-1",
         position: 2,
      };

      const afterTestData = [
         {
            content: "Hello! I'm first block of the page",
            subBlocks: [
               {
                  content: "Hello! I'm a sub block",
                  subBlocks: [],
               },
               {
                  content: "Hello! I'm a sub block",
                  subBlocks: [],
               },
               {
                  content: "Hello! I'm first block of the page",
                  subBlocks: [
                     {
                        content: "Hello! I'm a sub block",
                        subBlocks: [],
                     },
                  ],
               },
            ],
         },
      ];

      request(app)
         .put("/api/move")
         .send(data)
         .end((err, res) => {
            expect(res.text).to.be.equal("Moved successfully");
            expect(res.statusCode).to.be.equal(200);
         });

      request(app)
         .get("/api/export")
         .end((err, res) => {
            expect(JSON.stringify(res.body)).to.be.equal(
               JSON.stringify(afterTestData)
            );
         });
   });

   it("PATCH /api/move --> sub block moved to root page", () => {
      const data = {
         sourcePath: "root-0-2-0",
         targetPath: "root",
         position: 0,
      };

      const afterTestData = [
         {
            content: "Hello! I'm a sub block",
            subBlocks: [],
         },
         {
            content: "Hello! I'm first block of the page",
            subBlocks: [
               {
                  content: "Hello! I'm a sub block",
                  subBlocks: [],
               },
               {
                  content: "Hello! I'm a sub block",
                  subBlocks: [],
               },
               {
                  content: "Hello! I'm first block of the page",
                  subBlocks: [],
               },
            ],
         },
      ];

      request(app)
         .put("/api/move")
         .send(data)
         .end((err, res) => {
            expect(res.text).to.be.equal("Moved successfully");
            expect(res.statusCode).to.be.equal(200);
         });

      request(app)
         .get("/api/export")
         .end((err, res) => {
            expect(JSON.stringify(res.body)).to.be.equal(
               JSON.stringify(afterTestData)
            );
         });
   });

   it("PATCH /api/move --> sub block moved to a block", () => {
      const data = {
         sourcePath: "root-1-0",
         targetPath: "root-0",
         position: 0,
      };

      const afterTestData = [
         {
            content: "Hello! I'm a sub block",
            subBlocks: [
               {
                  content: "Hello! I'm a sub block",
                  subBlocks: [],
               },
            ],
         },
         {
            content: "Hello! I'm first block of the page",
            subBlocks: [
               {
                  content: "Hello! I'm a sub block",
                  subBlocks: [],
               },
               {
                  content: "Hello! I'm first block of the page",
                  subBlocks: [],
               },
            ],
         },
      ];

      request(app)
         .put("/api/move")
         .send(data)
         .end((err, res) => {
            expect(res.text).to.be.equal("Moved successfully");
            expect(res.statusCode).to.be.equal(200);
         });

      request(app)
         .get("/api/export")
         .end((err, res) => {
            expect(JSON.stringify(res.body)).to.be.equal(
               JSON.stringify(afterTestData)
            );
         });
   });

   it("PATCH /api/move --> missing source path", () => {
      const data = {
         targetPath: "root-0",
         position: 0,
      };

      request(app)
         .put("/api/move")
         .send(data)
         .end((err, res) => {
            expect(res.text).to.be.equal("Missing source path or target path");
            expect(res.statusCode).to.be.equal(400);
         });
   });

   it("PATCH /api/move --> missing target path", () => {
      const data = {
         sourcePath: "root-0",
         position: 0,
      };

      request(app)
         .put("/api/move")
         .send(data)
         .end((err, res) => {
            expect(res.text).to.be.equal("Missing source path or target path");
            expect(res.statusCode).to.be.equal(400);
         });
   });

   it("PATCH /api/move --> invalid path (source path does not exist)", () => {
      const data = {
         targetPath: "root-23452340",
         sourcePath: "root-0",
         position: 0,
      };

      request(app)
         .put("/api/move")
         .send(data)
         .end((err, res) => {
            expect(res.text).to.be.equal(
               "Source block or target block does not exist"
            );
            expect(res.statusCode).to.be.equal(404);
         });
   });

   it("PATCH /api/move --> invalid path (target path does not exist)", () => {
      const data = {
         targetPath: "root-0",
         sourcePath: "root-2546254336",
         position: 0,
      };

      request(app)
         .put("/api/move")
         .send(data)
         .end((err, res) => {
            expect(res.text).to.be.equal(
               "Source block or target block does not exist"
            );
            expect(res.statusCode).to.be.equal(404);
         });
   });

   it("PATCH /api/move --> invalid path (move a page)", () => {
      const data = {
         targetPath: "root-0",
         sourcePath: "root",
         position: 0,
      };

      request(app)
         .put("/api/move")
         .send(data)
         .end((err, res) => {
            expect(res.text).to.be.equal("Cannot move the page");
            expect(res.statusCode).to.be.equal(400);
         });
   });
});
