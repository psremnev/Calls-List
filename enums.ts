export enum CallType {
  INCOMING = 1,
  OUTGOING = 0,
  ALL = null
}

export enum PartnerPosition {
  ACCOUNT = 'accountant',
  CALLLEADER = 'callleader',
  CALLMANAGER = 'callmanager',
  CHIEF_ACCOUNTANT = 'chief-accountant',
  CONTROLLER = 'controller',
  COPYWRITER = 'copywriter',
  DESIGNER = 'designer',
  DIRECTOR = 'director',
  FRMANAGER = 'frmanager',
  HR = 'hr',
  HR_ASSIST = 'hr-assist',
  LEADER = 'leader',
  MAINOPERATOR = 'mainoperator',
  MANAGER = 'manager',
  MODERATOR = 'moderator',
  OPERATOR = 'operator',
  SALE_MANAGER = 'sale-manager',
  SEO = 'seo',
  SKILLMANAGER = 'skillmanager',
  SUBMODERATOR = 'submoderator',
  SUPERVISOR = 'supervisor',
  WORKSUPPORT = 'worksupport'
}

export enum PartnerBlocked {
  blocked = 0,
  unblocked = 1
}

export enum CallStatus {
  TRUE = 'Дозвонился',
  FALSE = 'Не дозвонился'
}

export enum RATE_TYPE {
  BAD,
  GOOD,
  GREAT
}