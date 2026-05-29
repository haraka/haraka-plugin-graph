# haraka-plugin-graph

[![Test][ci-img]][ci-url] [![Cover][cov-img]][cov-url] [![Qlty][qlty-img]][qlty-url]

Haraka Graph plugin

This plugin logs accepted and rejected emails into a database and provides
a web server which you can browse to and view graphs over time of the
plugins which rejected connections.

In order for this to work you need to install the `sqlite3` module via
`npm install sqlite3` in your Haraka directory.

# Install

```
npm i haraka-plugin-graph
```

Add 'graph' to config/plugins

## Configuration

config settings are stored in config/graph.ini

- db_file

  The file name (or :memory:), where data is stored

- ignore_re

  Regular expression to match plugins to ignore for logging.
  Default: `queue|graph|relay`

The plugin hangs its routes off Haraka's built-in HTTP server (see Haraka's
`http.ini` for `http_addr` / `http_port`); it does not bind a listener of its
own.

<!-- leave these buried at the bottom of the document -->

[ci-img]: https://github.com/haraka/haraka-plugin-graph/actions/workflows/ci.yml/badge.svg
[ci-url]: https://github.com/haraka/haraka-plugin-graph/actions/workflows/ci.yml
[cov-img]: https://codecov.io/github/haraka/haraka-plugin-graph/coverage.svg
[cov-url]: https://codecov.io/github/haraka/haraka-plugin-graph
[qlty-img]: https://qlty.sh/gh/haraka/projects/haraka-plugin-graph/maintainability.svg
[qlty-url]: https://qlty.sh/gh/haraka/projects/haraka-plugin-graph
