import '../config';

export const dev = {
    app: {
        port: Number(process.env.SERVER_PORT) || 3003
    },
    db: {
        url: process.env.MONGODB_URL || 'mongodb+srv://xilujain:Wmnkdr123@cluster0.vvpooj5.mongodb.net/aws-db'
    }
}