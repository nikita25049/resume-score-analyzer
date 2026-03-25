export async function analyzeResumeMock(file) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = {
        score: Math.floor(Math.random() * 30 + 60),
        keywords: ['React', 'JavaScript', 'Frontend', 'CSS', 'UI/UX', 'Performance'],
        suggestions: [
          'Add more quantifiable achievements to your work experience.',
          'Format dates consistently across all roles.',
          'Include a brief summary statement highlighting your core competencies.',
          'Ensure the file is easily parsable by removing complex multi-column layouts.'
        ]
      };

      resolve(results);
    }, 2500);
  });
}
