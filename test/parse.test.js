import moment from 'moment'
import MockDate from 'mockdate'
import dayjs from '../src'

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

it('Now', () => {
  expect(dayjs().unix()).toBe(moment().unix())
})

it('String 20130208', () => {
  expect(dayjs('20130208').unix()).toBe(moment('20130208').unix())
})

it('String ISO 8601 date, time and zone ', () => {
  const time = '2018-04-04T16:00:00.000Z'
  expect(dayjs(time).unix()).toBe(moment(time).unix())
})

it('String timestamp 1523520536000 ms', () => {
  const timestamp = 1523520536000
  expect(dayjs(timestamp).unix()).toBe(moment(timestamp).unix())
})

it('String Other', () => {
  global.console.warn = jest.genMockFunction()// moment.js otherString will throw warn
  expect(dayjs('otherString').toString().toLowerCase()).toBe(moment('otherString').toString().toLowerCase())
})

it('Clone not affect each other', () => {
  const base = dayjs(20170101)
  const year = base.year()
  const another = base.clone()
  another.set('year', year + 1)
  expect(another.unix() - base.unix()).toBe(31536000)
})

it('Clone with same value', () => {
  const base = dayjs()
  const year = base.year()
  base.set('year', year + 1)
  const another = base.clone()
  expect(base.toString()).toBe(another.toString())
})
