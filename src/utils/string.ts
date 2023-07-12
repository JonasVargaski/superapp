export function getInitialsFromName(name = "") {
  const initials =
    [...name.matchAll(new RegExp(/(\p{L}{1})\p{L}+/, "gu"))] || [];

  return (
    (initials.shift()?.[1] || "") + (initials.pop()?.[1] || "")
  ).toUpperCase();
}
