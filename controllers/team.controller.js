import Team from "../models/Team.js";

// create a team
export const createTeam = async (req, res) => {
    const { name } = req.body;

    try {
        const team = await Team.create({
            name,
        });
        res.status(201).json(team);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// fetch all teams
export const getTeams = async (req, res) => {
    try {
        const teams = await Team.findAll();
        res.json(teams);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};