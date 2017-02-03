# mydir

**Built for Mac OS X**

mydir is a command line tool that can help keep track of commonly used folders without cluttering up your environment variables. I often find that it's tedious to call `cd` over and over to get to the folder of the project I'm working in. This way I can easily and intuitively set an alias for my project folder.

# Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Tutorial](#tutorial)
- [Usage](#usage)

## Prerequisites

You must have [npm/nodejs](https://docs.npmjs.com/getting-started/installing-node) installed.

## Installation

`npm install mydir -g`

In order to be able to call `cmydir <alias>` to instantly change to an aliased directory, run this in terminal after installation:

`. ~/.bash_profile`

## Tutorial

Create a project folder for yourself:

`mkdir -p ~/Documents/Projects/MyProject`

Create an alias with `mydir`:

`mydir set MyProject ~/Documents/Projects/MyProject`

Change to your project directory from any other directory:

`cmydir MyProject`

## Usage

### Set

To create an alias, use the `set` command:

`mydir set <alias> <path>`

For example:

`mydir set MyProject ~/Documents/Projects/MyProject`

**Note: the path provided must be absolute.**

### Recall an alias

To use an alias you've created, just call `mydir` with your alias as the second argument:

`mydir <alias>`

For example:

`mydir MyProject`

The main usage of this is to `cd` into an aliased folder. This is how you would do that:

`cmydir MyProject`

Here's what's happening behind the scenes:

`cd $(mydir MyProject)`

### List

To see all existing aliases, call `mydir list`

### Remove

To remove an existing alias, call `mydir rm <alias>`
