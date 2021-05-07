export default function getQueryParams(param) {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get(param);
    return myParam;
}