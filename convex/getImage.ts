import { query } from './_generated/server'

export default query(async ({ db }): Promise<ArrayBuffer | null> => {
  const imageDoc = await db.table('images').first();
  if (imageDoc === null) {
    return null;
  }
  return imageDoc.image;
})
