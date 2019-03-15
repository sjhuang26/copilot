# Warp Drive

Warp Drive is a feature that allows the merging of code from other stages into the current project. This doc explains how to use it.

## Overview

Suppose the student has a project set up in the folder `prj/`. Let `stg/` be a the folder that contains the files for the next stage. If we warp to `stg/`, then the directives in the comments of the files in `prj/` and `stg/` will be compared to splice the appriopriate lines of code from `stg/` to `prj/`.

## Projects

A project is just a folder that contains files that the student is working on. We will use the following examples in later sections:

```
prj/
 | deck.py
 + subfolder/
    | file.py
```

## Stages

A stage is laid out as a directory whose structure mimicks the structure of the project. For example, a stage might be laid out as follows:

```
stg/
 | deck.py
 | newfile.py
 + subfolder/
    | file.py
```

The contents of the files in `stg/` will, in general, be different from the files in `prj/`.

## Merging

When the stage is merged into the project, any new files are simply copied over as is. If the relative path of a file in stage matches the relative path of a file in the project (e.g. `deck.py` or `subfolder/file.py`), then the following tags are used to merge them.

- `### BEGIN <name>`: This line would be in a stage file. It denotes the beginning of a **text region**.

- `### END <name>`: This line would be in a stage file. It denotes the end of a **text region**.

- `### SPLICE <name>`: This line would be in a project file. If there is a file in the stage that corresponds to this file, and if there is a **text region** in the corresponding stage file with the same name, then this line will be replaced with the corresponding text in the text region.

*Note: If a `### SPLICE <name>` tag is in a stage file, it will be copied over as is if its is in a text region region that is spliced into a project file. This is useful for specifying where any future splices should go*

## Considerations

- This currently only works with Python files. This doc will be updated when more languages are supproted.