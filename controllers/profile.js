
const handleGetProfile = (req, res, db) => {
    const { id } = req.params;

    db.select('*').from('users').where({ id })
        .then(users => {
            if (users.length) {
                res.json(users[0]);
            }
            else {
                res.status(400).json('User not found');
            }

        })
        .catch(err => res.status(400).json('error getting user'));

}

module.exports = {
    handleGetProfile
}