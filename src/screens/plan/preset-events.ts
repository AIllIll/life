export enum presetEventTypes {
    chores = 'chores', // things like laundry, cooking, cleaning
    physiological = 'physiological', // things like eating, bathroom
    social = 'social',
    date = 'date',
    familiy = 'family',
    work = 'work',
    study = 'study',
    entertainment = 'entertainment',
    other = 'other',
}

export const presetEventTypeConfig = [
    {
        type: presetEventTypes.chores,
        iconName: 'washing-machine',
        color: '#7AF0DB',
        events: ['laundry', 'dishes'],
    },
    {
        type: presetEventTypes.physiological,
        iconName: 'shower-head',
        color: '#A5EF7B',
        events: ['exercise'],
    },
    {
        type: presetEventTypes.social,
        iconName: 'food-takeout-box-outline',
        color: '#F0C369',
        events: [],
    },
    // {
    //     type: presetEventTypes.date,
    //     iconName: 'weight-lifter',
    //     color: '#E09FBB',
    //     events: [],
    // },
    // {
    //     type: presetEventTypes.familiy,
    //     iconName: 'weight-lifter',
    //     color: '#E07100',
    //     events: [],
    // },
    // {
    //     type: presetEventTypes.work,
    //     iconName: 'weight-lifter',
    //     color: '#F09283',
    //     events: [],
    // },
    // {
    //     type: presetEventTypes.study,
    //     iconName: 'weight-lifter',
    //     color: '#4B6BDE',
    //     events: [],
    // },
    // {
    //     type: presetEventTypes.entertainment,
    //     iconName: 'weight-lifter',
    //     color: '#FFF9B4',
    //     events: [],
    // },
    // {
    //     type: presetEventTypes.other,
    //     iconName: 'weight-lifter',
    //     color: '#FFACF9',
    //     events: [],
    // },
];
