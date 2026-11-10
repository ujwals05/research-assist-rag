import supabase from "../config/supabase.js";

async function testStorage() {
  const bucketName = "research-papers";
  const filePath = "test/storage-test.txt";

  try {
    // 1. Upload a test file
    const file = Buffer.from(
      "Supabase Storage connection successful!"
    );

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        contentType: "text/plain",
        upsert: true,
      });

    if (error) {
      throw error;
    }

    console.log("File uploaded:", data.path);

    // 2. Download the uploaded file
    const { data: downloadedFile, error: downloadError } =
      await supabase.storage
        .from(bucketName)
        .download(filePath);

    if (downloadError) {
      throw downloadError;
    }

    const content = await downloadedFile.text();

    console.log("Downloaded content:", content);

    // 3. Delete the test file
    const { error: deleteError } = await supabase.storage
      .from(bucketName)
      .remove([filePath]);

    if (deleteError) {
      throw deleteError;
    }

    console.log("Test file deleted successfully");
  } catch (error) {
    console.error("Storage test failed:", error);
  }
}

testStorage();