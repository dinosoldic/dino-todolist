export function EditIcon(size = 24): SVGElement {
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", String(size));
  svg.setAttribute("height", String(size));

  // let SVG use currentColor so CSS color controls it:
  svg.setAttribute("fill", "currentColor");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "0");

  const path = document.createElementNS(svgNS, "path");
  path.setAttribute(
    "d",
    "M3.548,20.938h16.9a.5.5,0,0,0,0-1H3.548a.5.5,0,0,0,0,1Z M9.71,17.18a2.587,2.587,0,0,0,1.12-.65l9.54-9.54a1.75,1.75,0,0,0,0-2.47l-.94-.93a1.788,1.788,0,0,0-2.47,0L7.42,13.12a2.473,2.473,0,0,0-.64,1.12L6.04,17a.737.737,0,0,0,.19.72.767.767,0,0,0,.53.22Zm.41-1.36a1.468,1.468,0,0,1-.67.39l-.97.26-1-1,.26-.97a1.521,1.521,0,0,1,.39-.67l.38-.37,1.99,1.99Zm1.09-1.08L9.22,12.75l6.73-6.73,1.99,1.99Zm8.45-8.45L18.65,7.3,16.66,5.31l1.01-1.02a.748.748,0,0,1,1.06,0l.93.94A.754.754,0,0,1,19.66,6.29Z"
  );

  svg.appendChild(path);
  return svg;
}

export function CheckIcon(size = 24): SVGElement {
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", "0 0 512 512");
  svg.setAttribute("width", String(size));
  svg.setAttribute("height", String(size));

  const path = document.createElementNS(svgNS, "path");
  path.setAttribute("d", "M465 127 241 384l-92-92m-9 93-93-93m316-165L236 273");
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", "currentColor");
  path.setAttribute("stroke-linecap", "square");
  path.setAttribute("stroke-miterlimit", "10");
  path.setAttribute("stroke-width", "44");

  svg.appendChild(path);
  return svg;
}

export function AddIcon(size = 24): SVGElement {
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");

  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", String(size));
  svg.setAttribute("height", String(size));
  svg.setAttribute("fill", "currentColor");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "0");

  // invisible background path (optional, keeps same viewbox)
  const bgPath = document.createElementNS(svgNS, "path");
  bgPath.setAttribute("fill", "none");
  bgPath.setAttribute("d", "M0 0h24v24H0z");
  svg.appendChild(bgPath);

  // main icon path
  const path = document.createElementNS(svgNS, "path");
  path.setAttribute(
    "d",
    "M22 5.18 10.59 16.6l-4.24-4.24 1.41-1.41 2.83 2.83 10-10L22 5.18zM12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8c1.57 0 3.04.46 4.28 1.25l1.45-1.45A10.02 10.02 0 0 0 12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.73 0 3.36-.44 4.78-1.22l-1.5-1.5c-1 .46-2.11.72-3.28.72zm7-5h-3v2h3v3h2v-3h3v-2h-3v-3h-2v3z"
  );

  svg.appendChild(path);
  return svg;
}

export function DeleteIcon(size = 24): SVGElement {
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");

  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", String(size));
  svg.setAttribute("height", String(size));
  svg.setAttribute("fill", "currentColor");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "0");

  const path = document.createElementNS(svgNS, "path");
  path.setAttribute(
    "d",
    "M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z"
  );

  svg.appendChild(path);
  return svg;
}

export function ShowPass(size = 24): SVGElement {
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");

  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", String(size));
  svg.setAttribute("height", String(size));
  svg.setAttribute("fill", "currentColor");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "0");

  const path1 = document.createElementNS(svgNS, "path");
  path1.setAttribute(
    "d",
    "M14 12c-1.095 0-2-.905-2-2 0-.354.103-.683.268-.973C12.178 9.02 12.092 9 12 9a3.02 3.02 0 0 0-3 3c0 1.642 1.358 3 3 3 1.641 0 3-1.358 3-3 0-.092-.02-.178-.027-.268-.29.165-.619.268-.973.268z"
  );

  const path2 = document.createElementNS(svgNS, "path");
  path2.setAttribute(
    "d",
    "M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316-.105-.316C21.927 11.617 19.633 5 12 5zm0 12c-5.351 0-7.424-3.846-7.926-5C4.578 10.842 6.652 7 12 7c5.351 0 7.424 3.846 7.926 5-.504 1.158-2.578 5-7.926 5z"
  );

  svg.appendChild(path1);
  svg.appendChild(path2);

  return svg;
}

export function HidePass(size = 24): SVGElement {
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");

  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", String(size));
  svg.setAttribute("height", String(size));
  svg.setAttribute("fill", "currentColor");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "0");

  const path = document.createElementNS(svgNS, "path");
  path.setAttribute(
    "d",
    "M12 19c.946 0 1.81-.103 2.598-.281l-1.757-1.757c-.273.021-.55.038-.841.038-5.351 0-7.424-3.846-7.926-5a8.642 8.642 0 0 1 1.508-2.297L4.184 8.305c-1.538 1.667-2.121 3.346-2.132 3.379a.994.994 0 0 0 0 .633C2.073 12.383 4.367 19 12 19zm0-14c-1.837 0-3.346.396-4.604.981L3.707 2.293 2.293 3.707l18 18 1.414-1.414-3.319-3.319c2.614-1.951 3.547-4.615 3.561-4.657a.994.994 0 0 0 0-.633C21.927 11.617 19.633 5 12 5zm4.972 10.558-2.28-2.28c.19-.39.308-.819.308-1.278 0-1.641-1.359-3-3-3-.459 0-.888.118-1.277.309L8.915 7.501A9.26 9.26 0 0 1 12 7c5.351 0 7.424 3.846 7.926 5-.302.692-1.166 2.342-2.954 3.558z"
  );

  svg.appendChild(path);
  return svg;
}
