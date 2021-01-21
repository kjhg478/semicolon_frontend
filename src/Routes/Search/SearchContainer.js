import React from "react";
import { withRouter } from "react-router-dom";
import SearchPresenter from "./SearchPresenter";
import { useQuery } from "react-apollo-hooks";
import { SEARCH } from "./SearchQueries";

export default withRouter(({ location: { search } }) => {
  const term = search.split("=")[1];
  const { data, loading } = useQuery(SEARCH, {
    skip: term === undefined,
      variables: {
        // 한글일경우 문제가 발생하여 decode를 시켜주어 재대로된값을 넘겨줌
      term : decodeURI(term)
    }
  });
  return <SearchPresenter searchTerm={term} loading={loading} data={data} />;
});