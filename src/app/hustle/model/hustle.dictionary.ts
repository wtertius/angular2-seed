import elements from './hustle.elements';

export default class dictionary {
    static shouldBeUpdated = false;
    translations: {};

    ngOnInit() {
        this.translations = this.buildTranslations();
    }

    static t(s) {
        return this.translations[s] || s;
    }

    buildTranslations() {
        if (!dictionary.shouldBeUpdated) {
            return dictionary.translations;
        }

        var translations = dictionary.translations;
        var actions = elements.GetActions();

        for (var action in actions) {
            if (translations[action] === undefined) {
                translations[action] = "";
            }

            var desc = actions[action];
            for (var i in desc.begin) {
                var position = desc.begin[i];
                if (translations[position] === undefined) {
                    translations[position] = "";
                }
            }
            for (var i in desc.end) {
                var position = desc.end[i];
                if (translations[position] === undefined) {
                    translations[position] = "";
                }
            }
        }

        console.log(translations);

        return translations;
    }
    static translations = {
        // Actions
        "american_grip_reflection": "",
        "americana": "Американка",
        "americana_out": "Выход из Американки",
        "anti_american_grip_reflection": "",
        "boat_change": "",
        "complex_rope": "Сложная веревочка",
        "creep": "",
        "cross": "Крест",
        "cross_grip_change": "",
        "cross_rope": "",
        "drop": "Drop",
        "fall_aside": "",
        "female_creep": "",
        "half_rope": "Полуверевочка",
        "hands_up": "",
        "handy_support": "",
        "lower_change": "",
        "male_top_change": "",
        "openning": "Раскрытие",
        "roll_back": "",
        "roll_in": "Roll in",
        "roll_out": "Roll out",
        "rolling_in_front": "",
        "rope": "Веревка",
        "rope_change_side": "",
        "rope_in": "Вход в веревку",
        "rope_out": "Выход из веревки",
        "rotation_under_hand": "Вращение под рукой",
        "shadow": "Теневая позиция",
        "shadow_out": "Выход из теневой позиции",
        "spin": "Спин",
        "support": "Поддержка",
        "support_american": "",
        "swift": "",
        "telespin": "",
        "titanic": "Титаник",
        "top_change": "Верхняя смена",
        "top_spin": "",
        "twist_three": "",
        "twisted_drop": "",
        "under_wing_in": "Вход под крыло",
        "under_wing_mirror_change": "",
        "under_wing_mirror_in": "",
        "under_wing_mirror_out": "",
        "under_wing_out": "Выход из под крыла",
        "under_wing_reflection": "",
        "waltz": "Вальс",
        // Positions
        "american_grip": "",
        "anti_american_grip": "",
        "anti_roped_in": "",
        "cross_grip_top_left": "",
        "cross_grip_top_right": "",
        "hands_up_position": "",
        "leg_between_legs": "",
        "lower_american_grip": "",
        "mirror_grip": "Зеркальный хват",
        "opened_position": "Раскрытие",
        "ready_to_twist": "",
        "rolled_in": "",
        "roped_in": "",
        "same_hand_opened_position": "",
        "shadow_position": "Теневая позиция",
        "side_grip": "",
        "straight_grip": "Прямой хват",
        "straight_under_grip": "",
        "swift_position": "",
        "under_wing_mirror_back": "",
        "under_wing_mirror_position": "",
        "under_wing_position": "Под крылом"
    };
}
