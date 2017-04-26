export default class schemes {
    static startPosition = "straight_grip";
    // TODO Choose level: "beginner", "middle", "professional"
    static actions = {
        "under_wing_in": {
            "begin": "straight_grip",
            "end": ["under_wing_position", "ready_to_twist"]
        },
        "twist_tree": {
            "begin": "ready_to_twist",
            "end": ["straight_grip"]
        },
        "under_wing_out": {
            "begin": "under_wing_position",
            "end": "straight_grip"
        },

        "under_wing_reflection": {
            "begin": "under_wing_position",
            "end": "under_wing_position"
        },
        "under_wing_mirror_in": {
            "begin": "mirror_grip",
            "end": "under_wing_mirror_position"
        },
        "under_wing_mirror_change": {
            "begin": "under_wing_mirror_position",
            "end": "under_wing_mirror_position"
        },
        "under_wing_mirror_out": {
            "begin": ["under_wing_mirror_position", "under_wing_mirror_back"],
            "end": ["mirror_grip", "cross_grip_top_right", "cross_grip_top_left"]
        },
        "cross_rope": {
            "begin": "cross_grip_top_left",
            "end": "under_wing_mirror_back"
        },
        "cross_grip_change": {
            "begin": "cross_grip_top_right",
            "end": "cross_grip_top_left",
        },
        "creep": {
            "begin": "cross_grip_top_left",
            "end": "cross_grip_top_right"
        },
        "female_creep": {
            "begin": "roped_in",
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
            "end": ["straight_grip", "mirror_grip"]
        },
        "hands_up": {
            "begin": "straight_under_grip",
            "end": "hands_up_position"
        },
        "handy_support": {
            "begin":  "hands_up_position",
            "end": ["hands_up_position", "leg_between_legs"]
        },
        "twisted_drop": {
            "begin":  "leg_between_legs",
            "end": "anti_american_grip"
        },
        "boat_change": {
            "begin": "straight_grip",
            "end": "straight_under_grip",
        },
        "rope": {
            "begin": "straight_grip",
            "end": "straight_grip"
        },
        "rope_in": {
            "begin": "straight_grip",
            "end": "roped_in"
        },
        "rope_out": {
            "begin": ["roped_in", "anti_roped_in"],
            "end": "straight_grip"
        },
        "rope_change_side": {
            "begin": "roped_in",
            "end": "anti_roped_in",
        },
        "spin": {
            "begin": "mirror_grip",
            "end": "straight_grip"
        },
        "top_spin": {
            "begin":  "straight_grip",
            "end": ["straight_grip", "roped_in"]
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
            "end": ["rolled_in", "under_wing_position", "american_grip", "anti_american_grip"]
        },
        "support_american": {
            "begin": "american_grip",
            "end": "american_grip"
        },
        "roll_out": {
            "begin": "rolled_in",
            "end": ["opened_position", "side_grip", "roped_in"]
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
            "end": ["american_grip", "straight_grip", "mirror_grip"]
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
            "begin": "mirror_grip",
            "end": "shadow_position"
        },
        "shadow_out": {
            "begin": "shadow_position",
            "end": "mirror_grip"
        },
        "cross": {
            "begin": "straight_grip",
            "end": "straight_grip"
        },
        "fall_aside": {
            "begin": "under_wing_position",
            "end": "under_wing_position"
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
            "mirror_grip>mirror_grip": "public/video/shadow.pm4"
        }
    };
}
