export default class schemes {
    static startPosition = "straight_grip";
    // TODO Choose level: "beginner", "middle", "professional"
    static actions = {
        "under_wing": {
            "begin": "straight_grip",
            "end": "straight_grip"
        },
        "top_change": {
            "begin": "straight_grip",
            "end": "straight_grip"
        },
        "male_top_change": {
            "begin": "straight_grip",
            "end": "straight_grip"
        },
        "lower_change": {
            "begin": "straight_grip",
            "end": ["straight_grip", "mirrow_grip"]
        },
        "rope": {
            "begin": "straight_grip",
            "end": "straight_grip"
        },
        "spin": {
            "begin": "mirrow_grip",
            "end": "straight_grip"
        },
        "openning": {
            "begin": ["straight_grip", "american_grip"],
            "end": "opened_position"
        },
        "support": {
            "begin": ["anti_american_grip","straight_grip", "opened_position"],
            "end": "american_grip"
        },
        "drop": {
            "as": "support"
        },
        "americana": {
            "begin": ["straight_grip", "american_grip"],
            "end": "american_grip"
        },
        "americana_out": {
            "begin": "american_grip",
            "end": "straight_grip"
        },
        "roll_in": {
            "begin": "opened_position",
            "end": "rolled_in"
        },
        "roll_out": {
            "begin": "rolled_in",
            "end": ["opened_position", "side_grip"]
        },
        "roll_back": {
            "begin": "side_grip",
            "end": "anti_american_grip"
        },
        "swift": {
            "begin": "swift_position",
            "end": "straight_grip"
        },
        "titanic": {
            "begin": ["same_hand_opened_position", "shadow_position"],
            "end": "opened_position"
        },
        "telespin": {
            "begin": "lower_american_grip",
            "end": "opened_position"
        },
        "waltz": {
            "begin": "lower_american_grip",
            "end": ["american_grip", "straight_grip", "mirrow_grip"]
        },
        "rolling_in_front": {
            "begin": ["rolled_in", "american_grip"],
            "end": ["anti_american_grip"]
        },
        "complex_rope": {
            "begin": "straight_grip",
            "end": ["american_grip", "lower_american_grip", "swift_position",
                "opened_position", "same_hand_opened_position"]
        },
        "rotation_under_hand": {
            "begin": ["american_grip", "lower_american_grip"],
            "end": "opened_position"
        },
        "shadow": {
            "begin": "mirrow_grip",
            "end": "shadow_position"
        },
        "shadow_out": {
            "begin": "shadow_position",
            "end": "mirrow_grip"
        },
        "cross": {
            "begin": "straight_grip",
            "end": "straight_grip"
        },
        "half_rope": {
            "begin": "straight_grip",
            "end": "straight_grip"
        }
    };
    static positions = {
        "straight_grip": {
            "img": ""
        }
    };
    static video = {
        "shadow":{
            "mirrow_grip>mirrow_grip": "public/video/shadow.pm4"
        }
    };
}
