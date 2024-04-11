export function isEnumValue(type: { [key: string]: string }, value: string | undefined): boolean {
  return !!value && Object.values(type).includes(value);
}
