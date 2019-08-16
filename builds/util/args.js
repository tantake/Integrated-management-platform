import yargs from 'yargs'
const args = yargs.option('production', {
        boolean: true,
        default: false,
        describle: 'min all script'
    })
    .option('watch', {
        boolean: true,
        default: false,
        describle: 'watch all files'
    })
    .option('verbose', {
        boolean: true,
        default: false,
        describle: 'log'
    })
    .option('sourcemaps', {
        describle: 'force the creation of sourcemaps'
    })
    .option('port', {
        string: true,
        default: 3000,
        describle: 'server port'
    })
    .argv
export default args