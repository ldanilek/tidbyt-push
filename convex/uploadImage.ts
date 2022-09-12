import { mutation } from './_generated/server'

export default mutation(
  async ({ db }, image: ArrayBuffer) => {
    const imageDoc = await db.table('images').first();
    if (imageDoc === null) {
      db.insert('images', {image})
    } else {
      db.patch(imageDoc._id, {image});
    }
  }
)
