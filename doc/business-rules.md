### Business rules and invariants

#### Goal

This demo application provides fast search of hospitality objects worldwide based on their geolocation and additional attributes.
Its primary purpose is to retrieve object identifiers for booking or other external consumers.

The application aggregates data from several independent external providers.
The list of providers is open for future extension.

The data volume is relatively large (currently, one provider contains ~2,000,000 records).
Search response time should remain acceptable (approximately under 10 seconds) even when returning several thousand results.

The application also supports **geolocation bookmarks (search centers)** with additional attributes.
Search centers act as starting points for searching hospitality objects within a defined radius.

Search centers may be:

* public (available for all users),
* restricted to specific user groups,
* personal (owned by a single user).

---

#### Application roles

* **Global administrator**
  Can add or revoke hospitality data providers and global search centers using RDBMS tools.

* **Group administrator**
  Can create and remove group search centers and manage user groups using the application UI.

* **User**
  Can create and remove personal search centers and manage their own groups using the application UI.

---

#### Core invariants

* **Hospitality objects are read-only** within the system and fully depend on external providers.
  They must comply with the providers’ API rules and restrictions.

* **Hospitality objects and search centers are independent concepts.**
  Search centers are used only to narrow search conditions and do not affect object data.

* **Access to search centers is restricted by ownership and group membership.**
  Users can read public search centers and group search centers they belong to.

* **Group administrators cannot modify or remove public search centers.**

---

#### Search behavior rules

* Hospitality objects can be searched using:

    * at least two letters of the city name, or
    * at least one letter of the object name.
      These parts are separated by a comma.

* If a space is entered after the comma, the search is restricted to all objects within the specified city.

* Additional filters may be applied:

    * object type(s),
    * country,
    * temporary or permanent search center with a defined search radius.

---

#### UI behavior rules

* The UI must always reflect the current search state, including:

    * selected search center,
    * search radius,
    * active filters,
    * current selection.

* When a user selects a new search center, the previous search center and its selection are discarded.

---

#### External integration

* The application returns the identifier of a selected hospitality object to external consumers.
