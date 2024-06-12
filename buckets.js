const BUCKETS__PLUGIN_NAME = "buckets";
const BUCKETS__DELAY = 300;
const BUCKETS__AMOUNT_UNIT = "mL";
const BUCKETS__BASE_LABEL = "Total O-Count";
const BUCKETS__NEW_LABEL = `${BUCKETS__BASE_LABEL} / Juice Amount`;
const BUCKETS__AMOUNTS = {
    low: 2,
    regular: 3.5,
    high: 5
}
const BUCKETS__DEFAULT_CONFIGURATION = {
    meanAmount: 'regular',
};

setTimeout(async () => {
    const userConfiguration = await csLib.getConfiguration(BUCKETS__PLUGIN_NAME, {});
    const {meanAmount} = {
        ...BUCKETS__DEFAULT_CONFIGURATION,
        ...userConfiguration
    }

    const addBucketsNode = () => {
        setTimeout(() => {

            const statsElements = Array.prototype.slice.call(document.getElementsByClassName("stats-element"));

            const oCountStat = statsElements.find((stat) => {
                return stat.querySelector("p.heading").innerHTML === BUCKETS__BASE_LABEL;
            });

            const oCounter = parseInt(oCountStat.querySelector("p.title").innerHTML);

            const bucketsAmount = BUCKETS__AMOUNTS[meanAmount] * oCounter;

            oCountStat.querySelector("p.heading").innerHTML = BUCKETS__NEW_LABEL;
            oCountStat.querySelector("p.title").innerHTML = `${oCounter} / ${bucketsAmount} ${BUCKETS__AMOUNT_UNIT}`;

        }, BUCKETS__DELAY);
    }

    window.navigation.addEventListener("navigate", (event) => {
        addBucketsNode();
    });

    addBucketsNode();
});