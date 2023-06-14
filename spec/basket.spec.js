const { Basket, BigBasket  }= require('../src/basket')

describe('Create the basket', () => {
  let testBasket
  beforeEach(() => {
    testBasket = new Basket()
  })

  it('add the new bagel', () => {
    expect(testBasket.addBagel('BGLO')).toEqual([
      { sku: 'BGLO', price: '0.49', name: 'Bagel', variant: 'Onion' }
    ])
  })

  it('bagel type has not been added', () => {
    expect(testBasket.addBagel('')).toEqual([])
  })

  it('remove bagel from basket', () => {
    testBasket.addBagel('BGLP')
    expect(testBasket.removeBagel('BGLP')).toEqual([])
  })
  it('remove bagel from basket with more than 1 item', () => {
    testBasket.addBagel('BGLO')
    testBasket.addBagel('BGLP')
    expect(testBasket.removeBagel('BGLP')).toEqual([
      { sku: 'BGLO', price: '0.49', name: 'Bagel', variant: 'Onion' }
    ])
  })
  it('remove bagel type is not in the cart', () => {
    testBasket.addBagel('BGLO')
    testBasket.addBagel('BGLP')
    expect(testBasket.removeBagel('Ham')).toEqual([
      { sku: 'BGLO', price: '0.49', name: 'Bagel', variant: 'Onion' },
      { sku: 'BGLP', price: '0.39', name: 'Bagel', variant: 'Plain' }
    ])
  })
  it('try to add a bagel when small basket is full', () => {
    testBasket.addBagel('BGLO')
    testBasket.addBagel('BGLP')
    testBasket.addBagel('BGSS')
    testBasket.addBagel('BGSE')
    const basket = [...testBasket.basket]
    expect(testBasket.addBagel('COF')).toEqual(basket)
  })
  it('try to add a bagel when small basket is not full', () => {
    testBasket.addBagel('BGLO')
    testBasket.addBagel('BGLP')
    testBasket.addBagel('BGSS')
    const basketTwo = [...testBasket.basket]
    expect(testBasket.addBagel('COF')).toEqual([
      ...basketTwo,
      { sku: 'COF', price: '0.99', name: 'Bagel', variant: '' }
    ])
  })
  it('')
})

describe('Create big basket', () => {
  let testBasketTwo
  beforeEach(() => {
    testBasketTwo = new BigBasket()
  })

  it('add the new bagel', () => {
    expect(testBasketTwo.addBagel('BGLO')).toEqual([
      { sku: 'BGLO', price: '0.49', name: 'Bagel', variant: 'Onion' }
    ])
  })

  it('bagel type has not been added', () => {
    expect(testBasketTwo.addBagel('')).toEqual([])
  })

  it('remove bagel from basket', () => {
    testBasketTwo.addBagel('BGLP')
    expect(testBasketTwo.removeBagel('BGLP')).toBeTrue()
  })
  it('remove bagel from basket with more than 1 item', () => {
    testBasketTwo.addBagel('BGLO')
    testBasketTwo.addBagel('BGLP')
    expect(testBasketTwo.removeBagel('BGLP')).toBeTrue()
  })
  it('remove bagel type is not in the cart', () => {
    testBasketTwo.addBagel('BGLO')
    testBasketTwo.addBagel('BGLP')
    expect(testBasketTwo.removeBagel('COF')).toBeFalse()
  })

  it('try to add a bagel when we have 4 bagels in cart', () => {
    testBasketTwo.addBagel('COF')
    testBasketTwo.addBagel('COF')
    testBasketTwo.addBagel('COF')
    testBasketTwo.addBagel('COF')
    expect(testBasketTwo.addBagel('COF')).toEqual([
      { sku: 'COF', price: '0.99', name: 'Bagel', variant: '' },
      { sku: 'COF', price: '0.99', name: 'Bagel', variant: '' },
      { sku: 'COF', price: '0.99', name: 'Bagel', variant: '' },
      { sku: 'COF', price: '0.99', name: 'Bagel', variant: '' },
      { sku: 'COF', price: '0.99', name: 'Bagel', variant: '' }
    ])
  })

  it('if item does not exist in basket', () => {
    testBasketTwo.addBagel('BGLO')
    testBasketTwo.addBagel('BGLO')
    testBasketTwo.addBagel('BGLO')
    expect(testBasketTwo.removeBagel('BGLP')).toBeFalse()
  })

  it('if item does exist in basket', () => {
    testBasketTwo.addBagel('BGLO')
    testBasketTwo.addBagel('BGLO')
    testBasketTwo.addBagel('BGLO')
    expect(testBasketTwo.removeBagel('BGLO')).toBeTrue()
  })
})
