/*
 * @Author: unfetteredman
 * @Date: 2021-09-30 16:57:51
 * @Last Modified by: unfetteredman
 * @Last Modified time: 2021-10-06 14:46:39
 * @description: dotenv配置文件
 */

// const dotenv = require('dotenv')
require('dotenv').config({ path: '../../.env' });

module.exports = process.env;
