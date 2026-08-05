export default (db) => {
  const LyricSchema = new db.Schema(
    {
      number: String,
      baris: [String],
    },
    { _id: false } // Prevents an _id for each lyric section
  );
  return db.model(
    'Songs',
    new db.Schema({
      book: String,
      number: String,
      title: {
        type: String,
        required: true,
      },
      lyrics: [LyricSchema],
    })
  );
};
