export const keywordTree = (categories) => {
  const languages = [...new Set(categories.map((c) => c.language))];

  return {
    children: languages.map((language) => ({
      value: language,
      children: categories
        .filter((c) => c.language === language)
        .map((category) => ({
          key: category.id,
          title: category.name,
          children: category.keywords.map((keyword) => ({
            key: keyword.id,
            value: keyword.id,
            title: keyword.value,
            children: [],
            checked: false,
          })),
        })),
    })),
  };
};
