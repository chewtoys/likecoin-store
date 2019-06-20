export default {
  name: 'register-callout',
  experimentID: 'yJ6DYDagSYaZ36fBJLwu4w',
  isEligible: ({ route }) => route.path.includes('register'),
  variants: [
    { name: 'original', weight: 1 },
    { name: 'alternative', weight: 1 },
  ],
};
