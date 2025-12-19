# Domain Objects and Their Relationships

## Location

The **Location** object represents a static real-world entity on a geographical map that the application operates on.

Locations are provided by multiple external data providers.
The set of supported providers may be extended in the future.

### Location fields

The following fields are used internally by the application:

* **id**: *string*
  Unique identifier of the location within the application.

* **name**: *string*
  Public name of the location as provided by the data source.

* **country**: *string*
  Two-letter ISO country code where the location is situated.

* **city**: *string*
  City where the location is situated.
  The city name is often used as a primary search criterion.

* **lat**: *number*
  Latitude of the location in a standard coordinate system.

* **lng**: *number*
  Longitude of the location in a standard coordinate system.

* **thumbnail**: *string, optional*
  URL of an external image resource provided by the data source.

* **address**: *string, optional*
  Street address of the location.

* **description**: *string, optional*
  Short textual description of the location provided by the data source.

* **stars**: *number, optional*
  Rating of the location using the common “hotel stars” scale.

* **type**: *string, optional*
  Type of accommodation, for example: hotel, apartment, motel, inn, guest house, etc.

* **importantInfo**: *string, optional*
  Additional information related to the location, such as accommodation conditions or special notices.

## Search Center

The **Search Center** object represents a specific point on the map that is used as a reference for searching nearby locations.

Search centers may be public or have restricted access.
Typical examples of search centers include:

* Well-known landmarks (e.g. Eiffel Tower, Times Square)
* Company offices in different cities
* Logistics centers
* Places that are meaningful for a particular user

Search centers can be treated as bookmarks on the map.
When a users select a search center, they can immediately specify a search radius or area to narrow the result set.

### Search Center fields

* **country**: *string*
  Country where the search center is located.
  This value must be specified when the search center is created.

* **city**: *string*
  City where the search center is located.
  This value must be specified when the search center is created.

* **name**: *string*
  Name of the search center.
  The name must be unique within the same country, city, and group.

* **longitude**: *number*
  Longitude of the search center in a standard coordinate system.

* **latitude**: *number*
  Latitude of the search center in a standard coordinate system.

* **groupId**: *string*
  Identifier of the group to which the search center belongs.

## Search Center Group

A **Search Center Group** is a collection of search centers created for a specific purpose.

A search center group is represented in the UI as a **tab** within the search center selection dialog.

Search center groups can be:

* **public** — predefined, static groups created during application initialization;
* **personal** — user-owned groups that can be created, updated, or deleted by the user.

Search centers can be added to personal groups via a **context (popup) menu** on the map UI and removed from groups through the search center selection dialog.

### Search Center Group fields

* **id** *string*
  Unique identifier of the group. Search centers are associated with a group using this field.

* **name** *string*
  Human-readable name of the group.

* **description** *string, optional*
  Optional textual description of the group’s purpose.

* **isPublic** *boolean*
  Indicates whether the group is public or personal:

    * `true` — public, predefined, and immutable;
    * `false` — personal, user-managed.