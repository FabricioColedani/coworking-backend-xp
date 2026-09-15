module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    require: ['tests/step_definitions/**/*.ts'],
    format: ['summary', 'progress-bar'],
    publishQuiet: true
  }
};