let isRealString = (str: string | number): boolean => {
  return typeof str === 'string' && str.trim().length > 0;
}

export {isRealString};