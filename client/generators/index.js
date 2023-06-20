module.exports = (plop) => {
  plop.setGenerator('component', {
    description: 'Create a component',
    prompts: [
      {
        type: 'list',
        name: 'template',
        message: 'Choose template?',
        choices: [
          { name: 'page', value: 'page' },
          { name: 'component', value: 'component' },
          { name: 'ui', value: 'ui' },
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
        message: 'Copy your relative path where you want to create!',
      },
    ],
    actions: (data) => {
      const path = `../${data.path}/`
      const actions =
        data.template === 'page'
          ? [
              {
                type: 'add',
                path: path + '{{name}}/page.tsx',
                templateFile: `templates/${data.template}/index.tsx.hbs`,
              },
              {
                type: 'add',
                path: path + '{{name}}/page.test.tsx',
                templateFile: `templates/${data.template}/index.test.tsx.hbs`,
              },
              {
                type: 'add',
                path: path + '{{name}}/_components/index.ts',
              },
            ]
          : data.template === 'component'
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
              {
                type: 'add',
                path: path + '{{name}}/index.stories.tsx',
                templateFile: `templates/${data.template}/index.stories.tsx.hbs`,
              },
            ]
          : [
              {
                type: 'add',
                path: path + '{{pascalCase name}}/index.ts',
                templateFile: `templates/${data.template}/index.ts.hbs`,
              },
              {
                type: 'add',
                path: path + '{{pascalCase name}}/components/index.ts',
                templateFile: `templates/${data.template}/components/index.ts.hbs`,
              },
              {
                type: 'add',
                path: path + '{{pascalCase name}}/components/{{pascalCase name}}.tsx',
                templateFile: `templates/${data.template}/components/index.tsx.hbs`,
              },
              {
                type: 'add',
                path: path + '{{pascalCase name}}/stories/{{name}}.stories.tsx',
                templateFile: `templates/${data.template}/stories/index.stories.tsx.hbs`,
              },
            ]
      return actions
    },
  })
}
