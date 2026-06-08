from dataclasses import dataclass, field

@dataclass
class Player:
    """Temp dataclass to represent player.
    """
    name: str
    level: int
    games_played: int = 0
    rounds_resting: int = 0
    active: bool = True


@dataclass
class Session:
    """Temp dataclass to represent current session.
    This represents the whole present session and currently
    doesn't store history over different days.
    """
    date: str
    players_present: list[Player] = field(default_factory=list) 
    courts: int = 4
    round_length_estimate: float = 12.0


@dataclass
class SessionHistory:
    """Invidial Court session history. Winner is optional.
    """
    court: int
    round_number: int
    team1: tuple[Player, Player]
    team2: tuple[Player, Player]
    winner: int | None = None
    score: tuple[int, int] | None = None


@dataclass
class GeneralSettings:
    """General settings, shouldn't need to change much.
    """
    default_round_length: int = 12
    max_skill_gap: int = 5
    repeat_partner_penalty: int = 10
    repeat_opponent_penalty: int = 5


@dataclass
class SignupEntry:
    date: str
    name: str
    status: str
    gender: str
    player_type: str