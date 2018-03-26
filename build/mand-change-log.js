const wrap = require('word-wrap')

module.exports = {
  prompter: function(cz, commit) {
    cz.prompt([
      {
        type: "list",
        name: "type",
        message: "select the type of change that you\'re committing",
        choices: [
          {
            name: "feat: a feature addition (required)",
            value: "feat",
          },
          {
            name: "fix: fix a bug",
            value: "fix",
          },
          {
            name: "doc: a document modify or addition",
            value: "doc",
          },
          {
            name: "build: The front-end engineering",
            value: "build",
          },
          {
            name: "example: Example for component",
            value: "example"
          },
          {
            name: "test: unit test for component",
            value: "test"
          }
        ]
      },
      {
        type: "input",
        name: "scoped",
        message: "affected components for this commit, for example: button\n",
      },
      {
        type: "input",
        name: "description",
        message: "Abstract of this commit, perfer English\n",
        validate: function (str) {
          return !!str
        },
      },
      {
        type: "input",
        name: "issue",
        message: "Related issue number for this commit, please split with \'\,\'\n",
        validate: function (str) {
          return /(\d*\,)*\d*/.test(str)
        }
      }
    ])
      .then(answers => {
        const maxLineWidth = 80;
        
        const wrapOptions = {
          trim: true,
          newline: '\n',
          indent:'',
          width: maxLineWidth
        };
        

        // Hard limit this line
        let body = answers.type
        if (answers.scoped) {
          body += `(${answers.scoped}): `
        } else {
          body += ': '
        }
        body += answers.description
        if (answers.issue) {
          const issue = answers.issue.split(',')
          body += `[${issue.map(item => '#'+item).join(',')}]`
        }
        wrap(body, wrapOptions)
        commit(body)
      })
  }
}