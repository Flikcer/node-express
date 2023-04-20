const express = require("express");
const uuid = require("uuid");
const router = express.Router();
const members = require("../../Members");

//route gets all members
router.get("/", (req, res) => {
  res.json(members);
});

//get single member
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === Number(req.params.id));

  if (found) {
    res.json(members.filter((member) => member.id === Number(req.params.id)));
  } else {
    res.status(400).json({ msg: `member not found: ${re.params.id}` });
  }
});

//create member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "all fields must be entered" });
  }

  members.push(newMember);
  //   res.json(members);
  res.redirect("/");
});

//update member
router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === Number(req.params.id));

  if (found) {
    const updateMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updateMember.name ? updateMember.name : member.name;
        member.email = updateMember.email ? updateMember.email : member.email;

        res.json({ msg: "Member was updated", member });
      }
    });
  } else {
    res.status(400).json({ msg: `member not found: ${re.params.id}` });
  }
});

//delete member
router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === Number(req.params.id));

  if (found) {
    res.json({
      msg: "member deleted",
      members: members.filter((member) => member.id !== Number(req.params.id)),
    });
  } else {
    res.status(400).json({ msg: `member not found: ${re.params.id}` });
  }
});

module.exports = router;
