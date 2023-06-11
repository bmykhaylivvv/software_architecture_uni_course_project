import { ObjectId } from 'mongodb';

import { getMongoDbConnection } from '../../persistence/mongodb/mongodb.js';

/**
 * Class with service methods for review-management service
 */
export default class ReviewService {
  async test() {
    const mongoDbClient = getMongoDbConnection();
    const newListing = {
      name: 'Lovely Loft',
      summary: 'A charming loft in Paris',
      bedrooms: 1,
      bathrooms: 1,
    };

    // const result = await mongoDbClient
    //   .db('project')
    //   .collection('review')
    //   .insertOne(newListing);
    // console.log(
    //   `New listing created with the following id: ${result.insertedId}`
    // );

    const result = await mongoDbClient.db("project").collection("review").find({ _id: new ObjectId('6485702f411eea36c3ae27e0') });

    console.log(await result.toArray());

    return { result: 'OK' };
  }
}
