let clickUpgrades = [
    {
        name: 'strength',
        prices: 20,
        quantity: 0,
        multiplier: 1
    },
    {
        name: 'gold-bag',
        prices: 50,
        quantity: 0,
        multiplier: 3
    }
]

let autoUpgrades = [
    {
        name: 'goblin',
        prices: 20,
        quantity: 0,
        multiplier: 2,
    },
    {
        name: 'strong-goblin',
        prices: 50,
        quantity: 0,
        multiplier: 5
    }
]

let gold = 0
let clickStrength = 1
let costGrowth = 1.1

//clicks
function ClickChest() {
    gold += clickStrength;
    DrawCurrentClicks()
}

function AutoClickChest() {
    gold += CalcAutoClickGold()
    DrawCurrentClicks()
}

//buy
function BuyUpgrade(upgradeName, array) {
    let currRef = array.find(upgrade => upgradeName == upgrade.name)
    if (gold < currRef.prices) return

    gold -= currRef.prices
    currRef.quantity++
    currRef.prices++

    if (array == clickUpgrades) CalcClickGain()

    DrawPrices()
    DrawCurrentClicks()
    DrawClickStrength()
}

//calculate
function CalcClickGain() {
    clickStrength = 1
    clickUpgrades.forEach(upgrade => {
        clickStrength += upgrade.quantity * upgrade.multiplier
    });
}

function CalcAutoClickGold() {
    let currentAutoRate = 0
    autoUpgrades.forEach(upgrade => {
        currentAutoRate += upgrade.quantity * upgrade.multiplier
    });
    return currentAutoRate
}


//draw
function DrawCurrentClicks() {
    let currClickElm = document.getElementById('click-count')
    currClickElm.innerText = gold.toString()
}

function DrawPrices() {
    clickUpgrades.forEach(upgrade => {
        let currButtonElm = document.getElementById('')
        //currButtonElm.que
    })
}

function DrawClickStrength() {
    //click strength value (top bar)
    let currClickStrengthElm = document.getElementById('click-strength')
    currClickStrengthElm.innerText = clickStrength.toString()

    //auto gain value (top bar)
    let currAutoClickRateElem = document.getElementById('auto-click-rate')
    currAutoClickRateElem.innerText = CalcAutoClickGold().toString()

    clickUpgrades.forEach(upgrade => {
        let currClickStatElm = document.getElementById(upgrade.name)
        let clickElmAttr = currClickStatElm.getElementsByTagName('span')
        clickElmAttr[0].innerText = upgrade.quantity.toString()
        clickElmAttr[1].innerText = (upgrade.quantity * upgrade.multiplier).toString()
    })

    autoUpgrades.forEach(upgrade => {
        let currClickStatElm = document.getElementById(upgrade.name)
        let clickElmAttr = currClickStatElm.getElementsByTagName('span')
        clickElmAttr[0].innerText = upgrade.quantity.toString()
        clickElmAttr[1].innerText = (upgrade.quantity * upgrade.multiplier).toString()
    })
}

setInterval(AutoClickChest, 3000);
DrawCurrentClicks()
DrawClickStrength()