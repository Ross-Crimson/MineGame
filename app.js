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
let lifeTimeGold = 0
let clickStrength = 1
let costGrowth = 1.1

//clicks
function ClickChest() {
    AddGold(clickStrength)
}

function AutoClickChest() {
    AddGold(CalcAutoClickGold())
    SpawnGoblinLogic()
}

function AddGold(goldGained) {
    gold += goldGained
    lifeTimeGold += goldGained
    DrawCurrentClicks()
    DrawPrices()
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
    currClickElm.innerHTML = `${gold.toString()} <i class="mdi mdi-circle-multiple"></i>`

    let lifeTimeGoldElm = document.getElementById('lifetime')
    lifeTimeGoldElm.innerHTML = `LifeTime Gold: ${lifeTimeGold.toString()}<i class="mdi mdi-circle-multiple"></i>`
}

function DrawPrices() {
    clickUpgrades.forEach(upgrade => {
        let currButtonElm = document.getElementById(upgrade.name + "-btn")
        currButtonElm.innerHTML = `${upgrade.prices} <i class="mdi mdi-circle-multiple"></i>`
        if (gold < upgrade.prices) {
            currButtonElm.classList.add('disabled')
        }
        else {
            currButtonElm.classList.remove('disabled')
            //currButtonElm.classList.remove('hidden')
        }
    })
    autoUpgrades.forEach(upgrade => {
        let currButtonElm = document.getElementById(upgrade.name + "-btn")
        currButtonElm.innerHTML = `${upgrade.prices} <i class="mdi mdi-circle-multiple"></i>`
        if (gold < upgrade.prices) {
            currButtonElm.classList.add('disabled')
        }
        else {
            currButtonElm.classList.remove('disabled')
            //currButtonElm.classList.remove('hidden')
        }
    })
}

function DrawClickStrength() {
    //click strength value (top bar)
    let currClickStrengthElm = document.getElementById('click-strength')
    currClickStrengthElm.innerHTML = `<i
    class="mdi mdi-button-pointer"></i> ${clickStrength.toString()}`

    //auto gain value (top bar)
    let currAutoClickRateElem = document.getElementById('auto-click-rate')
    currAutoClickRateElem.innerHTML = `${CalcAutoClickGold().toString()} <i
    class="mdi mdi-timer"></i>`

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

//spawn goblin
function SpawnGoblinLogic() {
    //create a loop that goes through an active goblin count and adds animation class
    //Create thresholds for how many goblins should exist at once
    //after threshold is reached, incriment that to "active goblin" count
    //after timer ends go through loop and remove animation class


    let goblin = `<div class="col goblin-worker">
    <img class="goblin-size" src="assets/loot-goblin.png" alt="loot-goblin">
    </div>`
    let treasureSpace = document.getElementById('treasure-area')
    treasureSpace.innerHTML += goblin

    //currently does nothing
    setTimeout(() => {
        SpawnGoblin(goblin)
    }, 3000);
}

function SpawnGoblin(goblin) {

}

setInterval(AutoClickChest, 3000);

DrawPrices()
DrawCurrentClicks()
DrawClickStrength()