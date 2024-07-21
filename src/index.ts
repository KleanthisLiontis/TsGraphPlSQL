import { ApolloServer } from "apollo-server";
import { schema } from "./schema";
import typeormConfig from "./typeorm.config";
import { Context } from "./types/Context";

const boot = async () => {

    const dbconn = await typeormConfig.initialize()
    const server = new ApolloServer({
        schema,
        context: (): Context => ({ dbconn }),
    });

    server.listen(5000).then(({ url }) => {
        console.log("listening on " + url)
    });
};

boot();