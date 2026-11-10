import prisma, {
  connectDatabase,
  disconnectDatabase,
} from "../db/index.js";

async function testDatabase() {
  try {
    await connectDatabase();

    // 1. Create a document
    const document = await prisma.document.create({
      data: {
        filename: "test-research-paper.pdf",
        storagePath: "test/test-research-paper.pdf",
      },
    });

    console.log("Document created:", document.id);

    // 2. Create a document chunk
    const chunk = await prisma.documentChunk.create({
      data: {
        documentId: document.id,
        content: "This is a sample research paper paragraph.",
        chunkIndex: 0,
        pageNumber: 1,
        metadata: {
          source: "database-test",
        },
      },
    });

    console.log("Chunk created:", chunk.id);

    // 3. Fetch document with its chunks
    const result = await prisma.document.findUnique({
      where: {
        id: document.id,
      },
      include: {
        chunks: true,
      },
    });

    console.log("Fetched document:", result);

    // 4. Delete test document
    // Its chunks should be deleted automatically.
    await prisma.document.delete({
      where: {
        id: document.id,
      },
    });

    console.log("Test document and chunks deleted successfully");
  } catch (error) {
    console.error("Database test failed:", error);
  } finally {
    await disconnectDatabase();
  }
}

testDatabase();