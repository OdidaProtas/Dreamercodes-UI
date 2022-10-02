export default function useSubdomain() {
  const sbd = window.location.host.split(".")[1]
    ? window.location.host.split(".")[0]
    : false;

  return sbd;
}
