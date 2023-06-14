module.export = (plop) => {
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
        message: 'Where do you want to create under src directory? ex) app/(services)/',
      },
    ],
    actions: (data) => {
      const path = `../src/${data.path}/`
      const actions = [
        {
          type: 'add',
          path: path + '{{pascalCase name}}/index.tsx',
          templateFile: `templates/${data.template}/index.ts.hbs`,
        },
        {
          type: 'add',
          path: path + '{{pascalCase name}}/index.test.tsx',
          templateFile: `templates/${data.template}/index.test.ts.hbs`,
        },
        data.templete === 'component' && {
          type: 'add',
          path: path + '{{pascalCase name}}/index.stories.tsx',
          templateFile: `templates/${data.template}/index.stories.ts.hbs`,
        },
      ]
      return actions
    },
  })
}
