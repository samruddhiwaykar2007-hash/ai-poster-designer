const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://samruddhiwaykar2007_db_user:Poster123@cluster0.pah4k1d.mongodb.net/ai-poster-designer?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected Successfully!");
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();