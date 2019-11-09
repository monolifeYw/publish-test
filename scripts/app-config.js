/**
 * Application Configuration.
 */

'use strict';

/**
 * Module dependencies
 */
const { join, resolve } = require('path');

/**
 * 기본 변수
 */
// Ruler Local include Mode
const IS_RULER_LOCAL = true;

// 프로젝트 Root 경로
const BASEPATH = resolve(__dirname, '..');

// 모듈 Path
const MODULE_PATH = resolve(BASEPATH, 'node_modules');

// ruler Base Path
const RULER_MODULE_PATH = resolve(MODULE_PATH, 'ruler');
const RULER_MODULE_LIBS_PATH = resolve(RULER_MODULE_PATH, 'ruler');
const RULER_MODULE_LIBS_LOCAL_PATH = resolve(RULER_MODULE_PATH, 'src/libs/ruler');

// 구동 환경 (default `development`)
const ENVIRONMENT = process.env.NODE_ENV || 'development';

// 구동 포트
const PORT = parseInt(process.env.PORT || '80', 10);

// 구동 서버
const HOST = '0.0.0.0';

/**
 * 서버 관련
 */
exports.SERVER = {
  PORT,
  HOST,
  IS_RULER_LOCAL
}

/**
 * 디렉토리 또는 파일 경로
 */
exports.PATHS = {
  // root path
  BASE_DIR: BASEPATH,
  MODULE_PATH,
  RULER_MODULE_PATH
};

/**
 * 브랜치별 version update
 */
exports.NPM_VERSION = {
  MASTER: 'minor',
  RELEASE: 'preminor',
  DEVELOP: 'prerelease'
}

exports.NPM_TAGGING = {
  STABLE: 'stable',
  RELEASE: 'release',
  DEVELOP: 'develop'
}

exports.RULER = {
  LIBS_DIR: RULER_MODULE_LIBS_PATH,
  LIBS_LOCAL_DIR: RULER_MODULE_LIBS_LOCAL_PATH,
  TSCONFIG: {
    "@common/*": [`${RULER_MODULE_LIBS_PATH}/common/*`]
  },
  TSCONFIG_LOCAL: {
    "@common/*": [`${RULER_MODULE_LIBS_LOCAL_PATH}/common/*`]
  }
}
