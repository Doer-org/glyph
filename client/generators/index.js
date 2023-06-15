module.exports = (plop) => {
  plop.setGenerator('component', {
    description: 'Create a component',
    prompts: [
      {
        type: 'list',
        name: 'template',
        message: 'Choose template?',
        choices: [
          { name: 'component', value: 'component' },
          { name: 'page', value: 'page' },
        ],
      },
      {
        type: 'input',
        name: 'name',
        message: 'What is your component / page name?',
      },
      {
        type: 'input',
        name: 'path',
        message: 'Where do you want to create under src directory? [ex) app/(service)]',
      },
    ],
    actions: (data) => {
      const path = `../src/${data.path}/`
      const actions =
        data.template === 'page'
          ? [
              {
                type: 'add',
                path: path + '{{name}}/index.tsx',
                templateFile: `templates/${data.template}/index.tsx.hbs`,
              },
              {
                type: 'add',
                path: path + '{{name}}/index.test.tsx',
                templateFile: `templates/${data.template}/index.test.tsx.hbs`,
              },
            ]
          : [
              {
                type: 'add',
                path: path + '{{name}}/index.tsx',
                templateFile: `templates/${data.template}/index.tsx.hbs`,
              },
              {
                type: 'add',
                path: path + '{{name}}/index.test.tsx',
                templateFile: `templates/${data.template}/index.test.tsx.hbs`,
              },
              {
                type: 'add',
                path: path + '{{name}}/index.stories.tsx',
                templateFile: `templates/${data.template}/index.stories.tsx.hbs`,
              },
            ]
      return actions
    },
  })
}
