import { effect as T } from "@matechs/effect";
import { AsOpaque, summon } from "@morphic-ts/batteries/lib/summoner-no-union";
import { AType, EType } from "@morphic-ts/batteries/lib/usage/utils";
import { iotsConfig } from "@morphic-ts/io-ts-interpreters/lib/config";
import * as E from "fp-ts/lib/Either";
import { Endomorphism, flow, identity } from "fp-ts/lib/function";
import { none, Option } from "fp-ts/lib/Option";
import { Mixed, success, Type } from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { withValidate } from "io-ts-types/lib/withValidate";
import { failure } from "io-ts/lib/PathReporter";

const emptyStringAsNone = <A, O, I>(codec: Type<Option<A>, O, I>) =>
  withValidate(codec, (i, c) =>
    typeof i === "string" && i === "" ? success(none) : codec.validate(i, c)
  );

const message = (s: string) => (c: Mixed) => withMessage(c, () => s);

const optionalString = (config?: Endomorphism<Mixed>) =>
  summon(F =>
    F.nullable(
      F.string(iotsConfig(config || identity)),
      iotsConfig(flow(emptyStringAsNone, config || identity))
    )
  );

const optionalBool = (config?: Endomorphism<Mixed>) =>
  summon(F =>
    F.nullable(
      F.boolean(iotsConfig(config || identity)),
      iotsConfig(config || identity)
    )
  );

const GetUserResponse_ = summon(F =>
  F.interface(
    {
      login: F.string(iotsConfig(message("invalid login"))),
      id: F.number(iotsConfig(message("invalid id"))),
      node_id: F.string(iotsConfig(message("invalid node_id"))),
      avatar_url: optionalString(message("invalid avatar url"))(F),
      gravatar_id: optionalString(message("invalid gravatar id"))(F),
      url: F.string(iotsConfig(message("invalid url"))),
      html_url: F.string(iotsConfig(message("invalid html url"))),
      followers_url: F.string(iotsConfig(message("invalid followers url"))),
      following_url: F.string(iotsConfig(message("invalid following url"))),
      gists_url: F.string(iotsConfig(message("invalid gists url"))),
      starred_url: F.string(iotsConfig(message("invalid starred url"))),
      subscriptions_url: F.string(
        iotsConfig(message("invalid subscriptions url"))
      ),
      organizations_url: F.string(
        iotsConfig(message("invalid organizations url"))
      ),
      repos_url: F.string(iotsConfig(message("invalid repos url"))),
      events_url: F.string(iotsConfig(message("invalid event url"))),
      received_events_url: F.string(
        iotsConfig(message("invalid received events url"))
      ),
      type: F.string(iotsConfig(message("invalid type"))),
      site_admin: F.boolean(iotsConfig(message("invalid site admin"))),
      name: F.string(iotsConfig(message("invalid name"))),
      company: optionalString(message("invalid company"))(F),
      blog: optionalString(message("invalid company"))(F),
      location: optionalString(message("invalid location"))(F),
      email: optionalString(message("invalid email"))(F),
      hireable: optionalBool(message("invalid hireable"))(F),
      bio: optionalString(message("invalid bio"))(F),
      public_repos: F.number(iotsConfig(message("invalid public repos"))),
      public_gists: F.number(iotsConfig(message("invalid public gists"))),
      followers: F.number(iotsConfig(message("invalid followers"))),
      following: F.number(iotsConfig(message("invalid following"))),
      created_at: F.date(iotsConfig(message("invalid created at"))),
      updated_at: F.date(iotsConfig(message("invalid updated at")))
    },
    "GetUserResponse"
  )
);

export interface GetUserResponse extends AType<typeof GetUserResponse_> {}
export interface GetUserResponseRaw extends EType<typeof GetUserResponse_> {}

export const GetUserResponse = AsOpaque<GetUserResponseRaw, GetUserResponse>(
  GetUserResponse_
);

export const decode = flow(GetUserResponse.type.decode, E.mapLeft(failure));
export const decodeT = T.liftEither(decode);
