import { dedupExchange, fetchExchange, Query, stringifyVariables } from "urql";
import { cacheExchange, Resolver, Cache } from "@urql/exchange-graphcache";
import { useEmployeesQuery } from "../generated/graphql";


export const createUrqlClient = (ssrExchange: any, ctx: any) => ({
  url: 'http://localhost:3000/graphql',
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          // employees: useEmployeesQuery()
        }
      }
    }),
    ssrExchange,
    fetchExchange],
})
