import { Container } from "@mui/material";
import { lazy, Suspense } from "react";
import Fallback from "../../../../../components/shared/fallback";

const SingleEditor = lazy(() =>
  import("../../../../../components/editors/singleEditor")
);

export default function () {
  return (
    <Container>
      <Suspense fallback={<></>}>
        <SingleEditor />
      </Suspense>
    </Container>
  );
}
