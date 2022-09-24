import { Container } from "@mui/material";
import { lazy, Suspense } from "react";
import Fallback from "../../../../../components/shared/fallback";
import PageLoader from "../../../../../components/shared/pageLoader";

const SingleEditor = lazy(() =>
  import("../../../../../components/editors/singleEditor")
);

export default function () {
  return (
    <Container>
      <Suspense fallback={<PageLoader/>}>
        <SingleEditor />
      </Suspense>
    </Container>
  );
}
