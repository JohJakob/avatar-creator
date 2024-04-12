export function isEnumValue(type: { [key: string]: string }, value: string | undefined): boolean {
  return !!value && Object.values(type).includes(value);
}

export function getDefaultEnumValue(type: { [key: string]: string }): string {
  return type[Object.keys(type)[0]];
}
